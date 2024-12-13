/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the event controller tests for the application.
 */

import request from "supertest";
import app from ".."; // Adjust the path based on your app's location
import createConnection from "@/database/connection";

// Mock dependencies
jest.mock("../database/connection");

describe("EventController Tests", () => {
  describe("GET /api/events/:djId", () => {
    it("should return events for a valid DJ ID", async () => {
      const mockEvents = [
        {
          eventId: 1,
          title: "Test Event",
          description: "Test Description",
          date: "2024-11-08",
          artistId: 1,
          userId: 1,
        },
      ];

      const mockConnection = {
        execute: jest.fn().mockResolvedValue([mockEvents, null]),
      };
      (createConnection as jest.Mock).mockResolvedValue(mockConnection);

      const response = await request(app).get("/api/events/1");

      expect(response.status).toBe(200);
      expect(response.body.events).toHaveLength(1);
      expect(response.body.events[0]).toHaveProperty("title", "Test Event");
    });

    // it('should return 404 if no events are found', async () => {
    //   const mockConnection = {
    //     execute: jest.fn().mockResolvedValue([[], null]),
    //   };
    //   (createConnection as jest.Mock).mockResolvedValue(mockConnection);

    //   const response = await request(app).get('/api/events/1');

    //   expect(response.status).toBe(404);
    //   expect(response.body).toHaveProperty('message', 'No events found for this DJ');
    // });

    // it('should return 400 if DJ ID is invalid', async () => {
    //   const response = await request(app).get('/api/events/invalidId');

    //   expect(response.status).toBe(400);
    //   expect(response.body).toHaveProperty('error', 'Invalid DJ ID');
    // });

    it("should return 500 if there is a database error", async () => {
      (createConnection as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const response = await request(app).get("/api/events/1");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error", "Internal server error");
    });
  });

  describe("GET /api/events/mock", () => {
    it("should return the mock events response", async () => {
      const response = await request(app).get("/api/events/mock");

      expect(response.status).toBe(200);
      expect(response.body.events).toHaveLength(1);
      expect(response.body.events[0]).toHaveProperty(
        "title",
        "Upcoming Music Event",
      );
      expect(response.body.events[0]).toHaveProperty("date", "2024-11-08");
    });
  });

  describe("POST /api/events/:djId/upload", () => {
    it("should successfully upload a new event", async () => {
      const mockResult = { insertId: 1 };

      const mockConnection = {
        execute: jest.fn().mockResolvedValue([mockResult, null]),
      };
      (createConnection as jest.Mock).mockResolvedValue(mockConnection);

      const response = await request(app).post("/api/events/1/upload").send({
        title: "Test Event",
        description: "Test Description",
        date: "2024-11-08",
        userId: 1,
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "Event posted successfully",
      );
      expect(response.body).toHaveProperty("event_id", 1);
    });

    it("should return 400 if required data is missing or invalid", async () => {
      const response = await request(app).post("/api/events/1/upload").send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "error",
        "Missing or invalid event data",
      );
    });

    it("should return 500 if there is a database error during upload", async () => {
      const mockConnection = {
        execute: jest.fn().mockRejectedValue(new Error("Database error")),
      };
      (createConnection as jest.Mock).mockResolvedValue(mockConnection);

      const response = await request(app).post("/api/events/1/upload").send({
        title: "Test Event",
        description: "Test Description",
        date: "2024-11-08",
        userId: 1,
      });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error", "Failed to upload event");
    });
  });

  describe("POST /api/events/upload", () => {
    it("should return the mock upload response", async () => {
      const response = await request(app).post("/api/events/mock/upload");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Event posted successfully",
      );
      expect(response.body).toHaveProperty("eventId", "3344");
    });
  });
});
