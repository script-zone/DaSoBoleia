import { Router, Request, Response } from "express";

import { BaseRepository } from "../infra/db/oracle/base-repositorio";
import { Controller } from "../core/controller";

function ok(response: Response, data: any) {
  return response.status(200).json(data);
}

function notFound(response: Response, message?: string) {
  return response.status(404).json({
    message: message || 'Nenhum registro encontrado!'
  });
}

function badRequest(response: Response, message: string) {
  return response.status(400).json({
    message
  });
}

export abstract class GenericController implements Controller {
  protected abstract repository: BaseRepository;
  public abstract path: string;
  public router = Router();

  protected all = async (_request: Request, response: Response) => {
    const records = await this.repository.getAll();
    if (records?.length) return notFound(response);
    return ok(response, records);
  }

  protected findById = async (request: Request, response: Response) => {
    const record = await this.repository.findOne(request.params);
    if (record) return ok(response, record);
    return notFound(response);
  }

  protected remove = async (request: Request, response: Response) => {
    const { id } = request.params;
    const deleted = await this.repository.removeById(id);
    return response.sendStatus(deleted ? 204 : 404);
  }

  protected add = async (request: Request, response: Response) => {
    if (!request.body) return badRequest(response, 'Não foram passados parâmetros, por favor verifique!');
    const newRecord = await this.repository.create(request.body);
    return ok(response, newRecord);
  }

  protected update = async (request: Request, response: Response) => {
    const { id } = request.params
    if (!request.body) return badRequest(response, 'Não foram passados parâmetros, por favor verifique!');
    const newRecord = await this.repository.updateById(id, request.body)
    return ok(response, newRecord);
  }

  protected initializeGenericRoutes(placeholderId = ':id') {
    this.router.get(`${this.path}`, this.all)
    this.router.get(`${this.path}/${placeholderId}`, this.findById)
    this.router.delete(`${this.path}/${placeholderId}`, this.remove)
    this.router.post(`${this.path}`, this.add)
  }
}
