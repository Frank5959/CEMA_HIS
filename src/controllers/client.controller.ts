import { Request, Response } from "express";
import { ClientService } from "../services/client.service";
import { ApiHelper } from "../helpers/api.helper";

// this controller handle client-related HTTP requests
const clientService = new ClientService();

export class ClientController {
  // Register a new client
  async createClient(req: Request, res: Response) {
    try {
      const client = await clientService.create(req.body);
      ApiHelper.success(res, client, 201);
    } catch (err: any) {
      console.error("Controller Error:", err);
      if (err.message === "Client with this contact info already exists") {
        return ApiHelper.error(res, err.message, 409);
      }
      // Fallback
      return ApiHelper.error(res, "Failed to create client", 500);
    }
  }
  //Get a client profile and enrollments
  async getClient(req: Request, res: Response) {
    try {
      const client = await clientService.findById(req.params.id);
      if (!client) return ApiHelper.notFound(res, "Client not found");
      const enrollments = await clientService.getEnrollments(req.params.id);
      ApiHelper.success(res, { client, enrollments });
    } catch (err) {
      console.error(err);
      ApiHelper.error(res, "Failed to retrieve client");
    }
  }
  //Search for clients by term
  async searchClients(req: Request, res: Response) {
    try {
      const term = req.query.term as string;
      if (!term) return ApiHelper.error(res, "Search term required", 400);
      const results = await clientService.search(term);
      console.log("✅ search results:", results);
      ApiHelper.success(res, results);
    } catch (err) {
      console.error(err);
      ApiHelper.error(res, "Search failed");
    }
  }
  //Enroll a client in a program
  async enrollClient(req: Request, res: Response) {
    try {
      const clientId = req.params.id;
      const { programId } = req.body;
      const enrolled = await clientService.enroll(clientId, programId);
      ApiHelper.success(res, enrolled, 201);
    } catch (err: any) {
      console.error(err);
      if (
        err.message === "Client not found" ||
        err.message === "Program not found"
      ) {
        return ApiHelper.error(res, err.message, 404);
      }
      ApiHelper.error(res, "Enrollment failed");
    }
    ApiHelper.error(res, "Enrollment failed");
  }
  //List enrollments for a client
  async getClientEnrollments(req: Request, res: Response) {
    try {
      const enrollments = await clientService.getEnrollments(req.params.id);
      ApiHelper.success(res, enrollments);
    } catch (err) {
      console.error(err);
      ApiHelper.error(res, "Failed to fetch enrollments");
    }
  }
}
