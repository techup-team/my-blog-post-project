/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Facebook,
  Linkedin,
  Twitter,
  SmilePlus,
  Copy,
  Loader2,
  X,
} from "lucide-react";
import { comments } from "@/data/comments";
import { Textarea } from "@/components/ui/textarea";
import authorImage from "../assets/author-image.jpeg";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ViewPost() {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://blog-post-project-api-with-db.vercel.app/posts/${param.postId}`
      );
      setImg(response.data.image);
      setTitle(response.data.title);
      setDate(response.data.date);
      setDescription(response.data.description);
      setCategory(response.data.category);
      setContent(response.data.content);
      setLikes(response.data.likes);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      navigate("*");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 container md:px-8 pb-20 md:pb-28 md:pt-8 lg:pt-16">
      <div className="space-y-4 md:px-4">
        <img
          src={img}
          alt={title}
          className="md:rounded-lg object-cover w-full h-[260px] sm:h-[340px] md:h-[587px]"
        />
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="xl:w-3/4 space-y-8">
          <article className="px-4">
            <div className="flex">
              <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
                {category}
              </span>
              <span className="px-3 py-1 text-sm font-normal text-muted-foreground">
                {new Date(date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mt-4 mb-10">{description}</p>
            <div className="markdown">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </article>

          <div className="xl:hidden px-4">
            <AuthorBio />
          </div>

          <Share likesAmount={likes} setDialogState={setIsDialogOpen} />
          <Comment setDialogState={setIsDialogOpen} />
        </div>

        <div className="hidden xl:block xl:w-1/4">
          <div className="sticky top-4">
            <AuthorBio />
          </div>
        </div>
      </div>
      <CreateAccountModal
        dialogState={isDialogOpen}
        setDialogState={setIsDialogOpen}
      />
    </div>
  );
}

function Share({ likesAmount, setDialogState }) {
  const shareLink = encodeURI(window.location.href);
  return (
    <div className="md:px-4">
      <div className="bg-[#EFEEEB] py-4 px-4 md:rounded-sm flex flex-col space-y-4 md:gap-16 md:flex-row md:items-center md:space-y-0 md:justify-between mb-10">
        <button
          onClick={() => setDialogState(true)}
          className="bg-white flex items-center justify-center space-x-2 px-11 py-3 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors group"
        >
          <SmilePlus className="w-5 h-5 text-foreground group-hover:text-muted-foreground transition-colors" />
          <span className="text-foreground group-hover:text-muted-foreground font-medium transition-colors">
            {likesAmount}
          </span>
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              toast.custom((t) => (
                <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start max-w-md w-full">
                  <div>
                    <h2 className="font-bold text-lg mb-1">Copied!</h2>
                    <p className="text-sm">
                      This article has been copied to your clipboard.
                    </p>
                  </div>
                  <button
                    onClick={() => toast.dismiss(t)}
                    className="text-white hover:text-gray-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              ));
            }}
            className="bg-white flex flex-1 items-center justify-center space-x-2 px-11 py-3 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors group"
          >
            <Copy className="w-5 h-5 text-foreground transition-colors group-hover:text-muted-foreground" />
            <span className="text-foreground font-medium transition-colors group-hover:text-muted-foreground">
              Copy
            </span>
          </button>
          <a
            href={`https://www.facebook.com/share.php?u=${shareLink}`}
            target="_blank"
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            <Facebook className="h-6 w-6" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`}
            target="_blank"
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href={`https://www.twitter.com/share?&url=${shareLink}`}
            target="_blank"
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            <Twitter className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Comment({ setDialogState }) {
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);
  const handleSendComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setIsError(true);
    } else {
      // Submit the comment
      setIsError(false);
      console.log("Comment submitted:", comment);
      // Add the logic for what should happen after sending the comment
    }
  };

  return (
    <div>
      <div className="space-y-4 px-4 mb-16">
        <h3 className="text-lg font-semibold">Comment</h3>
        <form className="space-y-2 relative" onSubmit={handleSendComment}>
          <Textarea
            value={comment}
            onFocus={() => {
              setIsError(false);
              setDialogState(true);
            }}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What are your thoughts?"
            className={`w-full p-4 h-24 resize-none py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
              isError ? "border-red-500" : ""
            }`}
          />
          {isError && (
            <p className="text-red-500 text-sm absolute">
              Please type something before sending.
            </p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <div className="space-y-6 px-4">
        {comments.map((comment, index) => (
          <div key={index} className="flex flex-col gap-2 mb-4">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={comment.image}
                  alt={comment.name}
                  className="rounded-full w-12 h-12 object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-col items-start justify-between">
                  <h4 className="font-semibold">{comment.name}</h4>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
              </div>
            </div>
            <p className=" text-gray-600">{comment.comment}</p>
            {index < comments.length - 1 && (
              <hr className="border-gray-300 my-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AuthorBio() {
  return (
    <div className="bg-[#EFEEEB] rounded-3xl p-6">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <img
            src={authorImage}
            alt="Thompson P."
            className="object-cover w-16 h-16"
          />
        </div>
        <div>
          <p className="text-sm">Author</p>
          <h3 className="text-2xl font-bold">Thompson P.</h3>
        </div>
      </div>
      <hr className="border-gray-300 mb-4" />
      <div className="text-muted-foreground space-y-4">
        <p>
          I am a pet enthusiast and freelance writer who specializes in animal
          behavior and care. With a deep love for cats, I enjoy sharing insights
          on feline companionship and wellness.
        </p>
        <p>
          When I&apos;m not writing, I spend time volunteering at my local
          animal shelter, helping cats find loving homes.
        </p>
      </div>
    </div>
  );
}

function CreateAccountModal({ dialogState, setDialogState }) {
  const navigate = useNavigate();
  return (
    <AlertDialog open={dialogState} onOpenChange={setDialogState}>
      <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-lg flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
          Create an account to continue
        </AlertDialogTitle>
        <button
          onClick={() => navigate("/signup")}
          className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-4 text-lg w-52"
        >
          Create account
        </button>
        <AlertDialogDescription className="flex flex-row gap-1 justify-center font-medium text-center pt-2 text-muted-foreground">
          Already have an account?
          <a
            onClick={() => navigate("/login")}
            className="text-foreground hover:text-muted-foreground transition-colors underline font-semibold cursor-pointer"
          >
            Log in
          </a>
        </AlertDialogDescription>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="w-16 h-16 animate-spin text-foreground" />
        <p className="mt-4 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}
