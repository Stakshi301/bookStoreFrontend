import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io";

const Footer=()=>{
    return(
        <>
        <div className="flex justify-around items-center h-16 bg-[#EDE0D4] mt-4">
<p className=" text-[#57382e] font-bold">Made with ❤️ & 💻 | © 2025 All rights reserved</p>

<div className="flex flex-col justify-center items-center">
<h4 className=" text-[#57382e] font-bold">Connect With Us</h4>
<div className="logos flex justify-between pl-4 pr-4 pt-2 pb-2 w-32">
<a className="text-2xl  text-[#6D4C41]" href="https://www.instagram.com/semwal_stakshi/"> <IoLogoInstagram/> </a>
<a  className="text-2xl text-[#6D4C41]" href="https://github.com/Stakshi301"> <IoLogoGithub/> </a>
<a  className="text-2xl text-[#6D4C41]" href="https://www.linkedin.com/in/stakshi-semwal-832226270/"> <IoLogoLinkedin/> </a>
</div>
</div>
        </div>
        </>
    )
}

export default Footer