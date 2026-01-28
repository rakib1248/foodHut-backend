import { NextFunction, Request, Response } from "express";
import { User } from "../../../generated/prisma/client";
import { providerService } from "./provider.service";

const createprovider = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }

    const requester = req.user;
    const Data = req.body;

    const provider = await providerService.createProvider(
      requester as User,
      Data,
    );

    res.status(200).json({
      ok: true,
      message: "profile updated successfully",
      data: provider,
    });
  } catch (err) {
    next(err);
  }
};
const getprovider = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const provider = await providerService.getProvider();

    res.status(200).json({
      ok: true,
      message: "provider profile  get successfully",
      data: provider,
    });
  } catch (err) {
    next(err);
  }
};
const getProviderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const provider = await providerService.getProviderById(id as string);

    res.status(200).json({
      ok: true,
      message: "provider profile and item get successfully",
      data: provider,
    });
  } catch (err) {
    next(err);
  }
};

export const providerController = {
  createprovider,
  getprovider,
  getProviderById,
};
