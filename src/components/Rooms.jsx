import { m } from 'framer-motion'
import { Camera, Users } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import { fadeUp, stagger } from './ui/motion.js'
import { LogoMark } from './Logo.jsx'
import { WhatsAppIcon } from './ui/Icons.jsx'
import { rooms } from '../data/rooms.js'
import { hotel } from '../data/hotel.js'
import { simpleMessage, whatsappUrl } from '../lib/contact.js'

const roomMessage = (name) =>
  `Hello ${hotel.name},\n\nI'd like to ask about ${name ? `the ${name}` : 'rooms'}.\n\nDate:\nNumber of guests:\nNights:\n\nPlease share availability and the current rate.`

function PhotosComingSoon({ className = '' }) {
  return (
    <div className={`relative flex flex-col items-center justify-center gap-5 overflow-hidden bg-forest-deep p-10 text-center text-sand ${className}`}>
      <div aria-hidden="true" className="absolute inset-5 border border-sand/15" />
      <LogoMark className="h-20 w-auto text-sand/80" />
      <p className="font-serif text-3xl text-offwhite">Hotel photos coming soon</p>
      <p className="flex items-center gap-2 text-sm text-sand/80">
        <Camera className="size-4" strokeWidth={1.5} aria-hidden="true" /> Ask us on WhatsApp for current photos
      </p>
    </div>
  )
}

function RoomCard({ room }) {
  const image = room.images?.[0]
  return (
    <m.article variants={fadeUp} className="group flex flex-col bg-white">
      {image ? (
        <div className="overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      ) : (
        <PhotosComingSoon className="aspect-[4/3]" />
      )}
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-3xl text-forest-deep">{room.name}</h3>
        {room.occupancy && (
          <p className="mt-2 flex items-center gap-2 text-sm text-earth-dark">
            <Users className="size-4" strokeWidth={1.5} aria-hidden="true" /> {room.occupancy}
          </p>
        )}
        {room.description && <p className="mt-4 text-charcoal/75">{room.description}</p>}
        {room.amenities?.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {room.amenities.map((a) => (
              <li key={a} className="border border-forest-deep/15 px-3 py-1 text-xs text-charcoal/75">
                {a}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <p className="font-serif text-xl text-forest-deep">
            {room.price ? `₹${room.price.toLocaleString('en-IN')} / night` : room.priceLabel}
          </p>
          <a href={whatsappUrl(roomMessage(room.name))} target="_blank" rel="noopener noreferrer" className="link-underline text-forest-deep">
            Enquire
          </a>
        </div>
      </div>
    </m.article>
  )
}

const asks = ['Your dates', 'Number of guests', 'Stay only, or with meals & activities']

export default function Rooms() {
  return (
    <section id="stay" aria-labelledby="stay-title" className="section-pad bg-sand-light/50">
      <div className="container-site">
        {rooms.length > 0 ? (
          <>
            <SectionHeading id="stay-title" eyebrow="Stay in Bamnoli" title="Rest After a Day of Exploring" intro="Comfortable stays for your Bamnoli escape." />
            <m.div
              className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              variants={stagger()}
            >
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </m.div>
          </>
        ) : (
          <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <PhotosComingSoon className="h-full min-h-[22rem] lg:min-h-[32rem]" />
            </Reveal>
            <div className="flex flex-col justify-center lg:col-span-6">
              <SectionHeading id="stay-title" eyebrow="Stay in Bamnoli" title="Rest After a Day of Exploring" intro="Comfortable stays for your Bamnoli escape." />
              <Reveal delay={0.1} className="mt-8">
                <p className="text-charcoal/75">Room options and rates change with the season. Send us a message with:</p>
                <ul className="mt-5 divide-y divide-forest-deep/10 border-y border-forest-deep/10">
                  {asks.map((a, i) => (
                    <li key={a} className="flex items-center gap-5 py-4">
                      <span className="font-serif text-lg text-earth-dark">0{i + 1}</span>
                      <span className="text-charcoal">{a}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={whatsappUrl(roomMessage())} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <WhatsAppIcon className="size-4" /> Ask About Rooms
                  </a>
                  <a href={whatsappUrl(simpleMessage('a group or family stay'))} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    Group & family stays
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
