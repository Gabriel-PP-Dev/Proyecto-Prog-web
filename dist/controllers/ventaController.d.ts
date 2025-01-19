import { Request, Response } from 'express';
export declare const getAllVentasController: (req: Request, res: Response) => Promise<void>;
export declare const addVentaController: (req: Request, res: Response) => Promise<void>;
export declare const getVentaByIdController: (req: Request, res: Response) => Promise<void>;
export declare const updateVentaController: (req: Request, res: Response) => Promise<void>;
export declare const deleteVentaController: (req: Request, res: Response) => Promise<void>;
export declare const exportVentasToPDFController: (req: Request, res: Response) => Promise<void>;
