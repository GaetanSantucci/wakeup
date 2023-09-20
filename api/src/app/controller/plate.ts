import { Request, Response } from 'express';

import { Plate } from '../datamapper/plate.js';
import { ErrorApi } from '../services/errorHandler.js';

// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');

const getAllPlates = async (req: Request, res: Response) => {
  try {

    const platesList = await Plate.findAll();
    if (!platesList) throw new ErrorApi('Impossible d\'obtenir la liste des articles', req, res, 400);

    return res.status(200).json(platesList)

  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

const getPlateById = async (req: Request, res: Response) => {
  try {

    const plateId = +req.params.plateId;
    console.log('plateId:', plateId);

    //todo utiliser uniquement la deuxieme requete
    const oneProduct = await Plate.findOne(plateId)


    if (!oneProduct) throw new ErrorApi('Article non trouvé', req, res, 404);

    return res.status(200).json(oneProduct)
  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

const createNewPlate = async (req: Request, res: Response) => {

  try {
    const newPlate = await Plate.create(req.body)

    if (newPlate) return res.status(200).json('L\'article a bien été crée');

  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

export { getAllPlates, getPlateById, createNewPlate }