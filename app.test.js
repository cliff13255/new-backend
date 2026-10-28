
require("dotenv").config({quiet:true});
const os = require("os");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./app");
const Post = require("./model/post"); 

 // let consoleLogSpy;

// beforeAll(async () => {
//     await mongoose.connect(process.env.MONGO_URI_TEST);
// });
beforeAll(async () => {
    //   consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    try {
       await mongoose.connect(process.env.MONGO_URI_TEST, {
    serverSelectionTimeoutMS: 5000,
    runtimeAdapters: { os }
});

        console.log("Connected DB:", mongoose.connection.name);
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        throw err;
    }
}, 10000);

afterAll(async () => {
    await mongoose.connection.close();
    //consoleLogSpy.mockRestore()
});


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
        .patch("/api/post/123")
        .send({name:"Clifford"});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
   expect(response.body.message).toContain("Invalid Id")
});


test("should return 404 when a post does not exist", async () => {
    const fakeId = "000000000000000000000001";

    const response = await request(app)
        .get(`/api/post/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain("user not found")
});

test("a post creation retiurns all the required fields",async()=>{
      const submittedPost = {
    title: "My last Tech Post",
    content: "This content is not definitely longer than twenty one characters, I promise.",
    category: "news",
    status: "draft",
    author: "6ad206f809939b2436873f19",
  };
    const response= await request(app).post('/api/post/').send(submittedPost)

  expect(response.status).toBe(201)
  expect(response.body.success).toBe(true)
  const requiredFields=["title","content","category","status","author"];
  requiredFields.forEach(field=>
    expect(response.body.post).toHaveProperty(field)
  )
  expect(response.body.post.title).toBe(submittedPost.title);

 
  const savedPost = await Post.findById(response.body.post._id);
  expect(savedPost).not.toBeNull();
  expect(savedPost.title).toBe(submittedPost.title);
})


});
