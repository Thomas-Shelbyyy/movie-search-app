from fastapi import FastAPI, Query
from database import movies_collection

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Welcome to the Movie Search API!"}

# Route to add a movie
@app.post("/add-movie/")
def add_movie(movie: dict):
    movies_collection.insert_one(movie)
    return {"message": "Movie added successfully!"}

# Route to get all movies
@app.get("/movies/")
def get_movies():
    movies = list(movies_collection.find({}, {"_id": 0}))  # Exclude MongoDB's default _id field
    return {"movies": movies}

# Route to search movies by title
@app.get("/search-movies/")
def search_movies(title: str = Query(..., description="Title of the movie")):
    movies = list(movies_collection.find({"title": {"$regex": title, "$options": "i"}}, {"_id": 0}))
    return {"movies": movies}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
