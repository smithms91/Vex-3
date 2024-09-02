# [Vex Cards](https://vex.cards)

Vex Cards is a digital business card app that allows users to easily share their custom profile with others, by scanning their business card under a phone with an NFC connection. The card also comes with a QR Code that will also point directly to the users profile.

Creating an account is extremely simple, and free, and can be changed anytime for no cost. This eliminates the need for carrying around hundreds of business cards to pass around. From your profile page, a visiting user can click "Add Contact" to save your contact information directly into their phone.

This will also create a contact on your profile page where you can see all the users who you have connected with, including the location and time you connected with them.

# Technologies

This project uses React and NextJS to handle routing and the front end UI, and is connected to a PostgreSQL database that is powered by Supabase. Additional libraries include: ShadCN UI for prebuilt scalable components, NextThemes for handling client side color themes, React Hook Form and Zod for forms and type validation, TailwindCSS for styling pages, and Framer Motion for re-ordering the socials list once you have added some. All authentication and storage is also handled by Supabase.

# Todo

- [ ] Finish Stripe Integration. *2
- [ ] (WIP) Premium Only Modal. *3
- [ ] If user is premium and using premium colors, when premium is disabled change their color to a default color.
- [ ] (Mostly done) Fix social icons that are images with a background color. Need SVG or pure icon.
- [ ] Profile Footer needs higher z-index, underneath Vex footer
- [ ] Back button from insights if coming from account page should not take you to settings page, instead accounts page. Same from settings page.


*2
- Check example in route file and see if you should update file accordingly. (using payment succeeded event)
- Create customers table (might already exist) and update table accordingly when user becomes premium member.
- Change success and error URLs and style them accordingly.
- Integrate premium features and hide them behind premium status in DB.
- Fix different prices on paid section and figure out the free 7 day trial
- Figure out how to actually add and retrieve metadata for subscription. (add user ID to subscription object)
- Get better and actually understand how stripe works. 

*3
- Decide if using the param method for premium modal (less code but runs slightly slower, but possibly more best practice?)
- Design modal

