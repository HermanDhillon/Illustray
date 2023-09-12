const User = require('../models/user');
const cloudinary = require('../middleware/cloudinary');

module.exports = {
  getUserProfile: async (req, res) => {
    try {
      const userData = await User.findByUsername(req.params.username);
      const { username, bio, profileimage } = userData;
      res.json({ username, bio, profileimage });
    } catch (err) {
      res.status(502).send('Error in getting User');
    }
  },
  updateProfilePic: async (req, res) => {
    try {
      const imageUrl = new URL(req.user.profileimage);
      const publicId = imageUrl.pathname.split('/').at(-1).split('.')[0];
      await cloudinary.uploader
        .destroy(publicId)
        .then((resp) => console.log('RESP: ', resp));
      const result = await cloudinary.uploader.upload(req.file.path);
      await User.findByUsernameAndUpdateProfilePic(
        req.user.username,
        result.url
      );
      res.send('Profile Pic updated');
    } catch (err) {
      console.log(err);
      res.status(502);
    }
  },
  updateBio: async (req, res)  => { 
    try { 
      await User.findByUsernameAndUpdateBio(req.user.username, req.body.bio.trim());
      res.send("Bio updated")
    } catch (err) {
      console.log(err)    
      res.status(502).send("Error in updating bio");
    }
    }
};
