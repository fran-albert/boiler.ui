import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/Event/Event";
import { formatDate } from "@/common/helpers/helpers";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useRoles from "@/hooks/Roles/useRoles";

interface Props {
  events: Event[];
}

export default function DataCard({ events }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const { isRRPPBoss } = useRoles();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = events.filter((e) =>
    `${e.name} `.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container">
      <div className="mt-5 flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold">Lista de Eventos</h2>
        <div className="flex items-center w-full sm:w-auto space-x-2">
          <Input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar eventos"
            className="flex-grow sm:flex-grow-0"
          />
          {isRRPPBoss && (
            <Button className="bg-cyan-950 hover:bg-cyan-800 w-full sm:w-auto">
              Agregar Nuevo
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4 md:p-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2"
          >
            <Link
              href={`/eventos/${event.id}`}
              className="absolute inset-0 z-10"
              prefetch={false}
            >
              <span className="sr-only">View</span>
            </Link>
            <img
              src="https://instagram.fros2-1.fna.fbcdn.net/v/t39.30808-6/450366329_122160220226209800_5820670910075527550_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDIwNDguc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fros2-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=lM4k3r4yXW0Q7kNvgHsQcCq&edm=AEhyXUkAAAAA&ccb=7-5&ig_cache_key=MzQxMDE1MTkzMjQxNTYxOTkzNw%3D%3D.2-ccb7-5&oh=00_AYB0xy5LYwqiQF3p7IyKJ8h_qtxwc3JITZIXW40f8hN1qA&oe=66C8614F&_nc_sid=8f1549"
              alt="Event Image"
              width={500}
              height={400}
              className="object-cover w-full h-48 sm:h-64"
              style={{ aspectRatio: "500/400", objectFit: "cover" }}
            />
            <div className="p-4 bg-background">
              <h3 className="text-lg sm:text-xl font-bold">{event.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {formatDate(String(event.date))}
              </p>
              <Button className="mt-4 bg-cyan-900">
                <Link href={`/eventos/${event.id}`}>Ver</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
