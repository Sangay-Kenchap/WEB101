export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  // This is just a placeholder route.
  // The actual upload goes to the Express backend on port 8000.
  res.status(200).json({ message: 'Use the Express backend at port 8000' });
}