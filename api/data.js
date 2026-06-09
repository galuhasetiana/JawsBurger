export default async function handler(req, res) {
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!googleScriptUrl) {
        return res.status(500).json({ error: "API URL belum diatur di Vercel." });
    }

    try {
        const response = await fetch(googleScriptUrl);
        
        if (!response.ok) {
            throw new Error("Gagal mengambil data dari Google");
        }

        const data = await response.json();
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}