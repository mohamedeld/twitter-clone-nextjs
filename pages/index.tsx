import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import { Inter } from "next/font/google";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});


export default function Home() {

  return (
  <div className={`${interSans.className}`}>
    <Header label="Header"/>
    <Form placeholder="What is happening?"/>
    <PostFeed/>
  </div>
  );
}


