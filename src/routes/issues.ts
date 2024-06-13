import { Request, Response, Router } from "express";
import { isValidObjectId } from "mongoose";
import Issue from "../models/issue";
import { connectDB } from "../utils/db";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
	try {
		await connectDB();

		const newIssue = new Issue(req.body);
		await newIssue.save();

		res.status(201).json(newIssue);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
});

router.get("/", async (req: Request, res: Response) => {
	try {
		await connectDB();
		const issues = await Issue.find(req.query);
		res.json(issues);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
});

router.get("/:id", async (req: Request, res: Response) => {
	try {
		await connectDB();

		if (!isValidObjectId(req.params.id)) {
			return res.status(404).send();
		}

		const issue = await Issue.findById(req.params.id);

		if (!issue) {
			res.status(404).send("Issue not found");
		} else {
			res.json(issue);
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
});

router.put("/:id", async (req: Request, res: Response) => {
	try {
		await connectDB();

		if (!isValidObjectId(req.params.id)) {
			return res.status(404).send();
		}

		const issue = await Issue.findByIdAndUpdate(req.params.id, req.body);

		if (!issue) {
			return res.status(404).send("Issue not found");
		} else {
			return res.json(issue);
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
});

router.patch("/:id", async (req: Request, res: Response) => {
	try {
		await connectDB();

		if (!isValidObjectId(req.params.id)) {
			return res.status(404).send();
		}

		const issue = await Issue.findById(req.params.id);

		if (!issue) {
			res.status(404).send("Issue not found");
		} else {
			await issue.updateOne(req.body);
			res.json(issue);
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
});

router.delete("/:id", async (req: Request, res: Response) => {
	try {
		await connectDB();

		if (!isValidObjectId(req.params.id)) {
			return res.status(404).send();
		}

		const issue = await Issue.findById(req.params.id);

		if (!issue) {
			res.status(404).send("Issue not found");
		} else {
			await issue.deleteOne();
			res.status(204).send();
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
});

export default router;
