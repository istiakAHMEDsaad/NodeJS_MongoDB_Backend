import * as fs from 'fs';
import express, { Request, Response } from 'express';

// Define the interface for a Tour object based on expected data structure
interface Tour {
  id: number;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  startDates: string[];
  [key: string]: any; // Fallback for other potential properties
}

// Define specific types for route handlers to strongly type params and body
type TourParams = {
    id: string; // Route parameters are always strings
};

type PostTourBody = Omit<Tour, 'id'>; // New tour body shouldn't have an ID (it's generated)
type PatchTourBody = Partial<PostTourBody>; // Patch body is a partial update

// ----------------------------------------------------------------------
// APP SETUP
// ----------------------------------------------------------------------
const app = express();

// Middleware
app.use(express.json());

// Load data and type it as an array of Tour objects
// Using 'utf-8' encoding to ensure readFileSync returns a string
const tours: Tour[] = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// ----------------------------------------------------------------------
// ROUTE HANDLERS
// ----------------------------------------------------------------------

// TODO1: get all tours
app.get('/api/v1/tours', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// TODO: get single tour
// Using the generic Request type with the specific TourParams
app.get('/api/v1/tours/:id', (req: Request<TourParams>, res: Response) => {
  // Convert string to number/integer
  const id: number = parseInt(req.params.id);

  // Use find to look for an element with a matching ID
  const tour: Tour | undefined = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'successs',
    data: {
      tour,
    },
  });
});

// TODO2: post methods
// Using the generic Request type with the specific PostTourBody for the request body
app.post('/api/v1/tours', (req: Request<{}, {}, PostTourBody>, res: Response) => {
  // Logic to determine the new ID
  const newId: number = tours[tours.length - 1].id + 1;
  // Use 'as Tour' to assert the type of the combined object
  const newTour: Tour = Object.assign({ id: newId }, req.body) as Tour;

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err: NodeJS.ErrnoException | null) => {
      // Handle potential file write error
      if (err) {
        console.error('Error writing file:', err);
        // In a real application, you'd handle this error more gracefully
        return res.status(500).json({
            status: 'error',
            message: 'Could not save tour data'
        });
      }

      // status 201 means created
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// TODO3: patch methods
// Using the generic Request type with the specific TourParams and PatchTourBody
app.patch('/api/v1/tours/:id', (req: Request<TourParams, {}, PatchTourBody>, res: Response) => {
  const id: number = parseInt(req.params.id);
  // Basic validation based on array length (assuming IDs are sequential and 1-based)
  if (id > tours.length || id < 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  // NOTE: The actual patching logic is missing in the original code,
  // it would go here (e.g., finding the tour and updating its properties).

  res.status(200).json({
    status: 'success',
    data: {
      tour: `<Updated tour with ID ${id} here...>`,
    },
  });
});

// TODO4: delete methods
app.delete('/api/v1/tours/:id', (req: Request<TourParams>, res: Response) => {
  const id: number = parseInt(req.params.id);

  if (id > tours.length || id < 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  // NOTE: The actual deletion logic is missing,
  // it would go here (e.g., removing the tour from the 'tours' array and saving the file).

  // status 204 means (deleted/no content)
  res.status(204).json({
    status: 'sucess',
    data: null, // 204 response typically has no body
  });
});

// ----------------------------------------------------------------------
// SERVER LISTEN
// ----------------------------------------------------------------------
const port: number = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});