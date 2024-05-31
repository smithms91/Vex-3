import { Paintbrush, Frame, Palette, QrCode, LineChart, FolderInput, MapPin, Download, Sparkles } from "lucide-react";
import Image from "next/image";

// Recommended, Contact Info, Social Links, Productivity Links, Payment Links, Music Links

export const allSocials = [
  {
    title: "Phone",
    network: "phone",
    href: "tel:",
    tooltip: "No need for dashes. 7 Digit phone works fine (ie. 12345678)",
    type: "recommended"
  },
  {
    title: "Phone",
    network: "phone",
    href: "tel:",
    tooltip: "No need for dashes. 7 Digit phone works fine (ie. 12345678)",
    type: "contact"
  },
  {
    title: "Email",
    network: "email",
    href: "mailto:",
    tooltip: "This is not the email you use to sign in. To change that email, go to user settings.",
    type: "recommended"
  },
  {
    title: "Email",
    network: "email",
    href: "mailto:",
    tooltip: "This is not the email you use to sign in. To change that email, go to user settings.",
    type: "contact"
  },
  {
    title: "Website",
    network: "website",
    href: "http://",
    tooltip: 'You only need to provide "www.YourWebsite.com". No need for http.',
    type: "recommended"
  },
  {
    title: "Website",
    network: "website",
    href: "http://",
    tooltip: 'You only need to provide "www.YourWebsite.com". No need for http.',
    type: "contact"
  },
  {
    title: "Instagram",
    network: "instagram",
    href: "https://instagram.com/",
    tooltip: "Just your username, no need to provide the website.",
    type: "recommended"
  },
  {
    title: "Instagram",
    network: "instagram",
    href: "https://instagram.com/",
    tooltip: "Just your username, no need to provide the website.",
    type: "social"
  },
  {
    title: "Facebook",
    network: "facebook",
    href: "https://www.facebook.com/",
    tooltip: "Just your username, no need to provide the website.",
    type: "social",
  },
  {
    title: "LinkedIn",
    network: "linkedin",
    href: "https://www.linkedin.com/in/",
    tooltip: "Just your username, no need to provide the website.",
    type: "recommended"
  },
  {
    title: "LinkedIn",
    network: "linkedin",
    href: "https://www.linkedin.com/in/",
    tooltip: "Just your username, no need to provide the website.",
    type: "social"
  },
  {
    title: "X",
    network: "x",
    href: "https://x.com/",
    tooltip: "Just your username, no need to provide the website.",
    type: "social"
  },
  {
    title: "YouTube",
    network: "youtube",
    href: "https://www.youtube.com/@",
    tooltip: "Just your username, no need to provide the website.",
    type: "social"
  },
  {
    title: "Snapchat",
    network: "snapchat",
    href: "https://www.snapchat.com/add/",
    tooltip: "Just your username, no need to provide the website.",
    type: "social"
  },
  {
    title: "TikTok",
    network: "tiktok",
    href: "https://www.tiktok.com/@",
    tooltip: "Just your username, no need to provide the website.",
    type: "social"
  },
  {
    title: "Twitch",
    network: "twitch",
    href: "https://www.twitch.tv/",
    tooltip: "Just your username, no need to provide the website.",
    type: "social"
  },
  {
    title: "Threads",
    network: "threads",
    href: "",
    tooltip: "Threads is a new messaging app by Instagram. Add your username here.",
    type: "social"
  },
  {
    title: "Pinterest",
    network: "pinterest",
    href: "",
    tooltip: "",
    type: "social"
  },
  {
    title: "Vimeo",
    network: "vimeo",
    href: "",
    tooltip: "",
    type: "social"
  },
  {
    title: "Clubhouse",
    network: "clubhouse",
    href: "",
    tooltip: "",
    type: "social"
  },
  {
    title: "Github",
    network: "github",
    href: "",
    tooltip: "Threads is a new messaging app by Instagram. Add your username here.",
    type: "productivity"
  },
  {
    title: "Discord",
    network: "discord",
    href: "",
    tooltip: "Open Discord and go to the Discord server you'd like to share. Press on the menu icon in the top left and tap 'Invite'. Then tap the gear icon and set the expire after to 'never'. Press 'Close' then 'Share Link'. Add the link here.",
    type: "contact"
  },
  {
    title: "Spotify",
    network: "spotify",
    href: "",
    tooltip: "Threads is a new messaging app by Instagram. Add your username here.",
    type: "music"
  },
  {
    title: "SoundCloud",
    network: "soundcloud",
    href: "",
    tooltip: "Threads is a new messaging app by Instagram. Add your username here.",
    type: "music"
  },
  {
    title: "Apple Music",
    network: "applemusic",
    href: "",
    tooltip: "Threads is a new messaging app by Instagram. Add your username here.",
    type: "music"
  },
  {
    title: "Address",
    network: "address",
    href: "",
    tooltip: "Enter your address here. This will be displayed on your profile.",
    type: "contact"
  },
  {
    title: "WhatsApp",
    network: "whatsapp",
    href: "https://api.whatsapp.com/send?phone=",
    tooltip: "Open WhatsApp, press on 'settings' in the bottom right, and press your name at the top of settings. Copy the phone number you see there.",
    type: "contact"
  },
  {
    title: "WeChat",
    network: "wechat",
    href: "",
    tooltip: "Open WeChat and go to the 'Me' tab. Copy the WeChat ID you see at the top.",
    type: "contact"
  },
  {
    title: "Telegram",
    network: "telegram",
    href: "https://t.me/",
    tooltip: "Go to the Telegram app, press Settings and look for the username at the top under your name. If you don't see a username there, use the Set Username button below to create one!",
    type: "contact"
  },
  {
    title: "Signal",
    network: "signal",
    href: "https://signal.org/",
    tooltip: "Go to the Telegram app, press Settings and look for the username at the top under your name. If you don't see a username there, use the Set Username button below to create one!",
    type: "contact"
  },
  {
    title: "Venmo",
    network: "venmo",
    href: "https://venmo.com/",
    tooltip: "Go to the Telegram app, press Settings and look for the username at the top under your name. If you don't see a username there, use the Set Username button below to create one!",
    type: "payment"
  },
  {
    title: "CashApp",
    network: "cashapp",
    href: "https://cash.app/$",
    tooltip: "Open Cash App and press on the profile picture in the top right. Add the username you see in gray under your name.",
    type: "payment"
  },
  {
    title: "PayPal",
    network: "paypal",
    href: "https://paypal.me/",
    tooltip: "Open PayPal and copy and paste your PayPal.me link here.",
    type: "payment"
  },

];

export const profileColors = [
  {
    color: "red",
    css: "bg-gradient-to-br from-[#ef7272] to-[#8f0000]",
    singleValue: "#8f0000",
  },
  {
    color: "orange",
    css: "bg-gradient-to-br from-[#efc372] to-[#9b6500]",
    singleValue: "#9b6500",
  },
  {
    color: "yellow",
    css: "bg-gradient-to-br from-[#efe772] to-[#b19f00]",
    singleValue: "#b19f00",
  },
  {
    color: "green",
    css: "bg-gradient-to-br from-[#81ef72] to-[#118f00]",
    singleValue: "#118f00",
  },
  {
    color: "blue",
    css: "bg-gradient-to-br from-[#72c6ef] to-[#004E8F]",
    singleValue: "#004E8F",
  },
  {
    color: "indigo",
    css: "bg-gradient-to-br from-[#b772ef] to-[#4a008f]",
    singleValue: "#4a008f",
  },
  {
    color: "violet",
    css: "bg-gradient-to-br from-[#ef72e9] to-[#8f0088]",
    singleValue: "#8f0088",
  },
  {
    color: "gray",
    css: "bg-gradient-to-br from-[#ebebeb] to-[#7c7c7c]",
    singleValue: "#7c7c7c",
  },
];

export const features = [
  { title: "Hide Vex Branding", subTitle: "Build your profile without Vex branding.", icon: <Paintbrush color="#576876" size={16} />, image: <Image src='/baby.jpg' alt="Hide Vex Branding" fill objectFit="cover" className='rounded-lg' /> },
  { title: "Add Your Logo", subTitle: "Showcase your identity with a personalized logo.", icon: <Frame color="#6AC46D" size={16} />, image: <Image src='/baby.jpg' alt="Add Your Logo" fill objectFit="cover" className='rounded-lg' /> },
  { title: "More Profile Themes", subTitle: "Stand out with exclusive colors and themes.", icon: <Palette color="#7B61FF" size={16} />, image: <Image src='/baby.jpg' alt="Hide Vex Branding" fill objectFit="cover" className='rounded-lg' /> },
  { title: "Customize Vex Code", subTitle: "Shape your QR code to match your style.", icon: <QrCode color="#FFC107" size={16} />, image: <Image src='/baby.jpg' alt="Customize Vex Code" fill objectFit="cover" className='rounded-lg' /> },
  { title: "Advanced Profile Insights", subTitle: "Discover more about your profile views and interactions.", icon: <LineChart color="#50CCBD" size={16} />, image: <Image src='/baby.jpg' alt="Advanced Profile Insights" fill objectFit="cover" className='rounded-lg' /> },
  { title: "Export Contacts", subTitle: "Easily take your contacts anywhere with a CSV file.", icon: <FolderInput color="#4FA8ED" size={16} />, image: <Image src='/baby.jpg' alt="Export Contacts" fill objectFit="cover" className='rounded-lg' /> },
  { title: "Contact Map", subTitle: "See where you met your connections and never lose track of meaningful interactions.", icon: <MapPin color="#4FA8ED" size={16} />, image: <Image src='/baby.jpg' alt="Contact Map" fill objectFit="cover" className='rounded-lg' /> },
  { title: "Download Vex Code", subTitle: "Download or print your code to carry your digital card wherever you go.", icon: <Download color="#59C0B7" size={16} />, image: <Image src='/baby.jpg' alt="Download Vex Code" fill objectFit="cover" className='rounded-lg' /> },
  { title: "AI Business Card Scanner", subTitle: "Scan a paper card and download it as a contact in seconds.", icon: <Sparkles color="#7B61FF" size={16} />, image: <Image src='/baby.jpg' alt="AI Business Card Scanner" fill objectFit="cover" className='rounded-lg' /> }
]