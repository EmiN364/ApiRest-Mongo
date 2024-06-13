import { Request, Response, Router } from "express";
import { isValidObjectId } from "mongoose";
import Task from "../models/task";
import { connectDB } from "../utils/db";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
	try {
		await connectDB();

		const newTask = new Task(req.body);
		await newTask.save();

		res.status(201).json(newTask);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
});

router.get("/", async (req: Request, res: Response) => {
	try {
		await connectDB();
		const tasks = await Task.find(req.query);
		res.json(tasks);
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

		const task = await Task.findById(req.params.id)
			.populate("assigned_user");

		/* const task = await Task.findById(req.params.id).populate({
			path: "assigned_user",
			select: "username bio",
		}); */

		if (!task) {
			res.status(404).send("Task not found");
		} else {
			res.json(task);
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

		const task = await Task.findByIdAndUpdate(req.params.id, req.body);

		if (!task) {
			return res.status(404).send("Task not found");
		} else {
			return res.json(task);
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

		const task = await Task.findById(req.params.id);

		if (!task) {
			res.status(404).send("Task not found");
		} else {
			task.title = req.body.title ?? task.title;
			task.description = req.body.description ?? task.description;
			task.completed = req.body.completed ?? task.completed;

			if (req.body.assigned_user) {
				task.assigned_user = req.body.assigned_user;
			}

			await task.save();
			res.json(task);
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

		const task = await Task.findById(req.params.id);

		if (!task) {
			res.status(404).send("Task not found");
		} else {
			await task.deleteOne();
			res.status(204).send();
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
});

export default router;
