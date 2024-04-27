import { Request, Response } from 'express';
import { MixService } from '../services/MixService';
import Gallons from '../model/volume';

const mixService = new MixService();

export const failedConstraintsDescription = { error: 'JugX, jugY, and targetVolume must be positive numbers' };

export const mix = (req: Request, res: Response): void => {
  const { jugX, jugY, targetVolume } = req.body;

  if (jugX <= 0 || jugY <= 0 || targetVolume <= 0) {
    res.status(400).json(failedConstraintsDescription);
    return;
  }

  const result = mixService.mix(Gallons.positive(jugX), Gallons.positive(jugY), Gallons.positive(targetVolume));

  res.send(result);
};
