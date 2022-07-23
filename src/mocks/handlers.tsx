/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { rest } from "msw";
import { NotesModule, NoteDataType } from "./data/notes";
import { dataHomepage } from "./data/home";
import { aboutme } from "./data/aboutme";
import {
    comments,
    CommentsHandlerServer,
    CommentsSlugType,
} from "./data/notes-comments";
import { users, UsersType } from "./data/users";

let currentUserID: string | null | undefined = "guest";
NotesModule.load();
export const handlers = [
    rest.get("/api/page/:slug", (req, res, ctx) => {
        const { slug } = req.params as { slug: string };
        switch (slug) {
            case "homepage":
                return res(ctx.json(dataHomepage), ctx.delay(400));
            case "aboutme":
                return res(ctx.json(aboutme), ctx.delay(400));
        }
        return res(ctx.json({}), ctx.delay(400));
    }),
    rest.get("/api/keepalive", (req, res, ctx) => {
        return res(ctx.json({}));
    }),
    // get all notea for NotesList, need use chache data
    rest.get("/api/notes/:page", (req, res, ctx) => {
        const { page } = req.params as { page: string };
        const pageNum = parseInt(page);
        const data = NotesModule.data();
        const pageNumMax = Math.floor(data.length / 10);
        if (isNaN(pageNum) || pageNum > pageNumMax)
            return res(
                ctx.json({ notes: [], pageNum, pageNumMax, last: true }),
                ctx.delay(400)
            );

        const perPage = 10;

        const indxMax = perPage * pageNum + perPage;
        let indxLast = indxMax < data.length ? indxMax : data.length;

        const notes: any[] = [];

        for (let i = perPage * pageNum; i < indxLast; i++) {
            notes.push({
                id: data[i].id,
                title: data[i].title,
                slug: data[i].slug,
                image: data[i].image,
                icon: data[i].icon,
                author: data[i].author,
                createdAt: data[i].createdAt,
                numComments: comments[data[i].slug]
                    ? comments[data[i].slug].numComments
                    : 0,
            });
        }

        return res(
            ctx.json({
                notes,
                pageNum,
                pageNumMax,
                last: pageNum >= pageNumMax,
            }),
            ctx.delay(400)
        );
    }),
    //
    rest.get("/api/note/:noteslug", (req, res, ctx) => {
        const { noteslug } = req.params as { noteslug: string };
        const data = NotesModule.data();
        const noteData: NoteDataType | undefined = data.find(
            (e) => e.slug === noteslug
        );
        if (noteData === undefined)
            return res(ctx.json(noteData), ctx.delay(400));
        noteData.numComments = comments[noteData.slug]
            ? comments[noteData.slug].numComments
            : 0;
        return res(ctx.json(noteData), ctx.delay(400));
    }),
    rest.get("/api/getready", (req, res, ctx) => {
        const ready = NotesModule.getReady();
        return res(ctx.json({ ready: ready }), ctx.delay(400));
    }),
    rest.get("/api/comments/:noteslug", (req, res, ctx) => {
        // Get comments by note slug
        const { noteslug }: { noteslug: string } = req.params as {
            noteslug: string;
        };
        const getComments = (
            commentsSlug: CommentsSlugType,
            users: UsersType
        ): CommentsSlugType => {
            if (commentsSlug === undefined)
                return { numComments: 0, comments: [] };
            const { comments } = commentsSlug;
            comments.forEach((e: any) => {
                const commentsChild = e.child || [];
                commentsChild.forEach((e: any) => {
                    e.picture = users[e.userid].picture;
                    e.name = users[e.userid].name;
                });
            });
            return commentsSlug;
        };
        let resBody: { error: boolean; payload?: CommentsSlugType } = {
            error: false,
        };
        try {
            resBody.payload = getComments(comments[noteslug], users);
        } catch (err: any) {
            resBody.error = err.message;
        }

        return res(ctx.json(resBody), ctx.delay(400));
    }),
    rest.post("/api/comments/:noteslug", (req: any, res, ctx) => {
        // CRUID operations of comments
        const { noteslug } = req.params as { noteslug: string };

        let resData: { error: any; payload?: any } = {
            error: false,
            payload: null,
        };

        try {
            const { type, payload }: { type: string; payload: any } =
                JSON.parse(req.body as string);
            resData = CommentsHandlerServer({
                comments,
                slug: noteslug,
                users,
                currentUserID,
            })[type](payload);
        } catch (err: any) {
            resData.error = err.message || true;
        }

        return res(ctx.json(resData), ctx.delay(400));
    }),
    rest.get("/api/users", (req, res, ctx) => {
        return res(ctx.json(users), ctx.delay(400));
    }),

    rest.post("/api/login", (req, res, ctx) => {
        try {
            const { id, email, name, picture }: any = JSON.parse(
                req.body as string
            );
            if (id === undefined)
                throw new Error("Server response: user id not defined.");
            currentUserID = id;

            users[id] = { email, name, picture };
        } catch (err: any) {
            return res(ctx.json({ error: err.message }));
        }

        return res(ctx.json({ error: false }));
    }),
];
