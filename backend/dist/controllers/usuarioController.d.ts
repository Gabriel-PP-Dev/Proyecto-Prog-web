import { Request, Response } from "express";
export declare const getAllUsersController: (req: Request, res: Response) => Promise<void>;
export declare const addUserController: (req: Request, res: Response) => Promise<void>;
export declare const getUserByIdController: (req: Request, res: Response) => Promise<void>;
export declare const updateUserController: (req: Request, res: Response) => Promise<void>;
export declare const deleteUserController: (req: Request, res: Response) => Promise<void>;
export declare const getUserByNameController: (req: Request, res: Response) => Promise<void>;
export declare const authenticateUserController: (req: Request, res: Response) => Promise<void>;
