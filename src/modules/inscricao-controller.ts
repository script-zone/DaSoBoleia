import { Router } from "express";

export class InscricaoController  {
  public path = '/inscricao'
  protected router = Router()


  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
  }
}
