import axios from "axios";

const url = 'http://localhost:5000/users/fb3bdba9-6de4-4727-8ff1-64fef55ca16e'

export const getUserTony = async (req, res) => {
    try {
      const response = await axios.get(url);
      const responseData = response.data;
  
      res.render('index.ejs', { responseData });
    } catch (error) {
      res.status(500).send('Error fetching data');
    }
  }