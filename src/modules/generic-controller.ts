import { Router, Request, Response } from "express";

import { BaseRepository } from "../infra/db/oracle/base-repositorio";
import { Controller } from "../core/controller";
import { BadRequestError, NotFoundError } from "../middlewares/global-error-handler";

export abstract class GenericController implements Controller {
  protected abstract repository: BaseRepository;
  public abstract path: string;
  public router = Router();
  protected placeholder = ':codigo'

  protected ok(response: Response, data: any) {
    return response.status(200).json(data);
  }

  protected all = async (_request: Request, response: Response) => {
    const { filters } = _request.body
    const records = await this.repository.getAll(filters);
    if (!records?.length) throw new NotFoundError('Ainda não existem registros!')
    return this.ok(response, records);
  }

  protected findById = async (request: Request, response: Response) => {
    const record = await this.repository.findOne(request.params);
    if (record) return this.ok(response, record)
    throw new NotFoundError('Não foi possivel encontrar esse registro!')
  }

  protected remove = async (request: Request, response: Response) => {
    const { codigo } = request.params
    const deleted = await this.repository.removeById(codigo);
    return response.sendStatus(deleted ? 204 : 404);
  }

  protected add = async (request: Request, response: Response) => {
    if (!request.body) throw new BadRequestError ('Não foram passados parâmetros!');
    const newRecord = await this.repository.create(request.body);
    return this.ok(response, newRecord);
  }

  protected update = async (request: Request, response: Response) => {
    if (!request.body) throw new BadRequestError('Não foram passados parâmetros!');
    const { codigo } = request.params
    const newRecord = await this.repository.updateById(codigo, request.body)
    return this.ok(response, newRecord);
  }

  protected initializeGenericRoutes(placeholderCodigo = `:codigo`) {
    this.router.get(`${this.path}`, this.all)
    this.router.get(`${this.path}/${placeholderCodigo}`, this.findById)
    this.router.delete(`${this.path}/${placeholderCodigo}`, this.remove)
    this.router.put(`${this.path}/${placeholderCodigo}`, this.update)
    this.router.post(`${this.path}`, this.add)
  }
}
