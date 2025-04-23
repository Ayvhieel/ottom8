module.exports = async (req, res) => {
  const { content, duration, timestamp } = req.body;
  
  // Validate inputs
  if (!content) {
    return res.status(400).json({ success: false, message: 'Status content is required' });
  }
  
  try {
    // Trigger the GitHub Action
    const result = await fetch(`https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_type: 'form-submission',
        client_payload: {
          content,
          duration: parseInt(duration) || 24,
          timestamp
        }
      })
    });
    
    return res.status(200).json({ success: true, message: 'Status update submitted!' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to process request' });
  }
};
