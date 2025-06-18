const { extractLocationFromDescription } = require('../gemini');
const { geocodeLocation } = require('../geocode');
const supabase = require('../supabaseClient');

const createDisaster = async (req, res) => {
  const { title, description, tags, created_by } = req.body; // ⬅️ include created_by

  try {
    const location_name = await extractLocationFromDescription(description);
    const coords = await geocodeLocation(location_name);

    if (!coords) return res.status(400).json({ error: 'Could not geocode location' });

    const { lat, lng } = coords;

    const { data, error } = await supabase
      .from('disasters')
      .insert([
        {
          title,
          description,
          tags,
          location_name,
          lat,
          lng,
          geolocation: `POINT(${lng} ${lat})`,
          created_by // ⬅️ use from body
        }
      ])
      .select();

    if (error) return res.status(400).json({ error });
    res.status(201).json(data);
  } catch (err) {
    console.error('Create Disaster Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getNearbyDisasters = async (req, res) => {
  const { lat, lng, radius } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'lat and lng are required' });
  }

  const searchRadius = parseFloat(radius) || 10000; // default: 10 km

  try {
    const { data, error } = await supabase.rpc('get_disasters_nearby', {
      lat_val: parseFloat(lat),
      lng_val: parseFloat(lng),
      radius_val: searchRadius
    });

    if (error) {
      console.error('Supabase RPC Error:', error);
      return res.status(500).json({ error: 'Supabase query failed' });
    }

    res.json(data);
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getDisasters = async (req, res) => {
  const { data, error } = await supabase
    .from('disasters')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error });
  res.json(data);
};
const deleteDisaster = async (req, res) => {
  const { id } = req.params; // ← this is where it was failing

  try {
    const { error } = await supabase
      .from('disasters')
      .delete()
      .eq('id', id);

    if (error) return res.status(400).json({ error });

    res.status(200).json({ message: 'Disaster deleted successfully' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getDisasterById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('disasters')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Disaster not found' });
    }

    res.json(data);
  } catch (err) {
    console.error('Get Disaster Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateDisaster = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags } = req.body;

  try {
    const { data, error } = await supabase
      .from('disasters')
      .update({ title, description, tags, updated_at: new Date() })
      .eq('id', id)
      .select();

    if (error) return res.status(400).json({ error });
    res.status(200).json(data);
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {  createDisaster, getDisasters, getNearbyDisasters,deleteDisaster,updateDisaster, getDisasterById};
