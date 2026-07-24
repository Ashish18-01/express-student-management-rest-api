import { useEffect, useState } from "react";
import api from "../../services/api";

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUser(response.data.data.user);
        } catch (error) {
            console.log(error);
            alert("Failed to fetch profile");
        } finally {
            setLoading(false);
        }
    };

    const uploadImage = async (e) => {
        e.preventDefault();

        if (!image) {
            return alert("Please select an image");
        }

        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("profileImage", image);

            await api.patch(
                "/auth/profile/image",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Profile Image Uploaded Successfully");

            fetchProfile();

        } catch (error) {
            console.log(error);
            alert("Upload Failed");
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <h1>Profile</h1>

            <h3>Username : {user.username}</h3>

            <h3>Email : {user.email}</h3>

            <h3>Role : {user.role}</h3>

            <h3>
                Joined : {new Date(user.createdAt).toLocaleDateString()}
            </h3>

            {user?.profileImage && (
                <img
                    src={`http://localhost:3000/${user.profileImage}`}
                    alt="Profile"
                    width="180"
                    height="180"
                    style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginTop: "20px"
                    }}
                />
            )}

            <br />
            <br />

            <form onSubmit={uploadImage}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <button type="submit">
                    Upload Image
                </button>
            </form>
        </div>
    );
}

export default Profile;