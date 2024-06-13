import { Request, Response, Router } from "express";
import User from "../models/user";
import { connectDB } from "../utils/db";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
	try {
		await connectDB();

		const newUser = new User(req.body);
		await newUser.save();

		return res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
});

router.get("/", async (req: Request, res: Response) => {
	try {
		await connectDB();
		const users = await User.find();
		return res.json(users);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
});

router.get("/:id", async (req: Request, res: Response) => {
	try {
		await connectDB();

		const user = await User.findById(req.params.id);

		if (!user) {
			res.status(404).send("User not found");
		} else {
			return res.json(user);
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
});

router.put("/:id", async (req: Request, res: Response) => {
	try {
		await connectDB();

		const user = await User.findById(req.params.id);

		if (!user) {
			res.status(404).send("User not found");
		} else {
			await user.updateOne(req.body);
			return res.json(user);
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
});

router.patch("/:id", async (req: Request, res: Response) => {
	try {
		await connectDB();

		const user = await User.findById(req.params.id);

		if (!user) {
			res.status(404).send("User not found");
		} else {
			user.username = req.body.name ?? user.username;
			user.email = req.body.email ?? user.email;
			user.age = req.body.age ?? user.age;
			user.bio = req.body.bio ?? user.bio;

			await user.save();
			return res.json(user);
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
});

router.delete("/:id", async (req: Request, res: Response) => {
	try {
		await connectDB();

		const user = await User.findById(req.params.id);

		if (!user) {
			res.status(404).send("User not found");
		} else {
			await user.deleteOne();
			return res.status(204).send();
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
});

export default router;
