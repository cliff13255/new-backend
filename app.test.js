
require("dotenv").config();

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./app");

// beforeAll(async () => {
//     await mongoose.connect(process.env.MONGO_URI_TEST);
// });


// afterAll(async () => {
//     await mongoose.connection.close();
// });


describe("Campus News API", () => {
  test("should return 404 for a nonexistent route", async () => {
    const response = await request(app).get("/this-route-does-not-exist");

    expect(response.status).toBe(404);
  });
  test("should return 200 for correct route",async()=>{
    const response=await request(app).get("/")

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toBe("New api works well")
  })

  test("inavalid inputs should return 400 ",async()=>{
    const response= await request(app).post("/api/post").send({})

    expect(response.status).toBe(400)
    expect(response.body.success).toBe(false)
    expect(Array.isArray(response.body.errors)).toBe(true)
    expect(response.body.errors).toBeInstanceOf(Array)
     expect(response.body.errors.length).toBeGreaterThan(0)
  })

  
test("should reject a number as the post category", async () => {
    const response = await request(app)
        .patch("/api/post/6ad77e2ba8f536cc275374b9")
        .send({ category: 123 });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
        "Category and status must be strings"
    );
});
test("should reject a boolen as the post category", async () => {
    const response = await request(app)
        .patch("/api/post/6ad77e2ba8f536cc275374b9")
        .send({ category: true });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
        "Category and status must be strings"
    );
});

test("should reject a white space as the post category", async () => {
    const response = await request(app)
        .patch("/api/post/6ad77e2ba8f536cc275374b9")
        .send({ category: " " });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
     expect(response.body.errors).toBeInstanceOf(Array)
    expect(response.body.errors.length).toBeGreaterThan(0);
});

test("should reject a invalid status as the post ", async () => {
    const response = await request(app)
        .patch("/api/post/6ad77e2ba8f536cc275374b9")
        .send({status:"unknown"});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
   expect(response.body.errors).toBeInstanceOf(Array)
    expect(response.body.errors.length).toBeGreaterThan(0);
});

test("should reject a invalid mongoID as the post ", async () => {
    const response = await request(app)
        .patch("/api/users/123")
        .send({name:"Clifford"});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
   expect(response.body.message).toContain("Invalid Id")
});


// test("should return 404 when a post does not exist", async () => {
//     const fakeId = "000000000000000000000001";

//     const response = await request(app)
//         .get(`/api/post/${fakeId}`);

//     expect(response.status).toBe(404);
//     expect(response.body.success).toBe(false);
// });



 

});
