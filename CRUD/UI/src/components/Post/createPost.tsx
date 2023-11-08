import React, { ChangeEvent, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { getCookie } from '../../utils/cookies';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreatePost: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  let navigate: NavigateFunction = useNavigate();

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const createPost = async (): Promise<void> => {
    const formData: any = new FormData()
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', image);
    const jwtToken: string | null = getCookie('jwtToken')
    const postCreationResponse: AxiosResponse<any,any> = await axios.post("http://localhost:3000/api/posts/create",formData,{headers: {jwtToken: jwtToken, 'Content-Type': 'multipart/form-data'}})
    if (postCreationResponse.data.status == 200) {
        toast.success(`${postCreationResponse.data.message}`,{
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
    }
    navigate("/")
    closeModal();
  };

  const handleCancel = (): void => {
    closeModal()
    navigate("/")
    location.reload()
  }

  const handleImageUpload = (files: FileList | null): void => {
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-4 rounded-lg relative z-10">
            <h2 className="text-xl font-semibold mb-4">Create Post</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 mb-2 border rounded dark:text-black"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>): void => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              className="w-full p-2 mb-4 border rounded dark:text-black"
              rows={4}
              value={content}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => setContent(e.target.value)}
            />
            <input
              type="file"
              accept="image/*" 
              className="w-full p-2 mb-4 border rounded dark:text-black"
              onChange={(e: ChangeEvent<HTMLInputElement>): void => handleImageUpload(e.target.files)}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={createPost}
            >
              Save Post
            </button>
            <button
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded ml-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
