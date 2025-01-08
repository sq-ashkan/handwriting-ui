/**
 * @author   Ashkan Sadri Ghamshi
 * @project  Character Recognition Web App
 * @course   HAWK University - Computer Science
 * @version  1.0.0
 * @since    January 2025
 */

import formidable from 'formidable';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = formidable();
  
  try {
    const [fields, files] = await form.parse(req);
    
    const imageFile = files.image[0];

    const formData = new FormData();
    formData.append('image', fs.createReadStream(imageFile.filepath));

    const apiResponse = await axios.post(
      'https://handwriting-production.up.railway.app/predict',
      formData,
      {
        headers: {
          ...formData.getHeaders()
        }
      }
    );

    res.status(200).json(apiResponse.data);
    
  } catch (error) {
    console.error('Full error:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data
    });
    
    res.status(500).json({ 
      error: 'Upload failed',
      details: error.message,
      apiError: error.response?.data
    });
  }
}