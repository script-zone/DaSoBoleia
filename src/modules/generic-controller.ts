import { Router, Request, Response } from "express";

import { BaseRepository } from "../infra/db/oracle/base-repositorio";
import { Controller } from "../core/controller";
import { BadRequestError, NotFoundError } from "../middlewares/global-error-handler";

export function ok(response: Response, data: any) {
  return response.status(200).json(data);
}

export abstract class GenericController implements Controller {
  protected abstract repository: BaseRepository;
  public abstract path: string;
  public router = Router();
  protected placeholder = ':id'

  protected all = async (_request: Request, response: Response) => {
    const records = await this.repository.getAll();
    if (records?.length) throw new NotFoundError('Ainda não existem registros!')
    return ok(response, records);
  }

  protected findById = async (request: Request, response: Response) => {
    const record = await this.repository.findOne(request.params);
    if (record) return ok(response, record)
    throw new NotFoundError('Não foi possivel encontrar esse registro!')
  }

  protected remove = async (request: Request, response: Response) => {
    const deleted = await this.repository.removeById(request.params[this.placeholder]);
    return response.sendStatus(deleted ? 204 : 404);
  }

  protected add = async (request: Request, response: Response) => {
    if (!request.body) throw new BadRequestError ('Não foram passados parâmetros!');
    const newRecord = await this.repository.create(request.body);
    return ok(response, newRecord);
  }

  protected update = async (request: Request, response: Response) => {
    if (!request.body) throw new BadRequestError('Não foram passados parâmetros!');
    const newRecord = await this.repository.updateById(request.params[this.placeholder], request.body)
    return ok(response, newRecord);
  }

  protected initializeGenericRoutes(placeholderId = ':id') {
    this.router.get(`${this.path}`, this.all)
    this.router.get(`${this.path}/${placeholderId}`, this.findById)
    this.router.delete(`${this.path}/${placeholderId}`, this.remove)
    this.router.post(`${this.path}`, this.add)
  }
}
