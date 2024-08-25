import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaInstagram } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { EditButtonIcon } from "@/components/Button/Edit/button";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/Event/Event";
import { formatDate } from "@/common/helpers/helpers";
import AddHistoryToEvent from "../Add-History";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTable } from "@/components/Table/table";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/types/User/User";
import useRoles from "@/hooks/Roles/useRoles";
import { InstagramStory } from "@/types/Instagram-Story/Instagram-Story";
import AddHistoryToEventDialog from "@/components/Instagram-Story/Add-History-To-Event";
const EventCardComponent = ({
  event,
  rrpp,
  instragramStories,
}: {
  event: Event | null;
  rrpp: any[];
  instragramStories: InstagramStory[];
}) => {
  const { isRRPP, isRRPPBoss } = useRoles();
  return (
    <>
      <section className="w-full max-w-4xl mx-auto p-6 md:p-8 lg:p-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">{event?.name}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {formatDate(String(event?.date))}
                </p>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <FaInstagram className="w-5 h-5 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {event?.expectedStoryCountPerUser} Publicaciones
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              src="https://instagram.fros2-1.fna.fbcdn.net/v/t39.30808-6/450366329_122160220226209800_5820670910075527550_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDIwNDguc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fros2-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=lM4k3r4yXW0Q7kNvgHsQcCq&edm=AEhyXUkAAAAA&ccb=7-5&ig_cache_key=MzQxMDE1MTkzMjQxNTYxOTkzNw%3D%3D.2-ccb7-5&oh=00_AYB0xy5LYwqiQF3p7IyKJ8h_qtxwc3JITZIXW40f8hN1qA&oe=66C8614F&_nc_sid=8f1549"
              alt="Event Logo"
              width={64}
              height={64}
              className="rounded-full"
              style={{ aspectRatio: "64/64", objectFit: "cover" }}
            />
          </div>
        </div>
        <Separator className="my-8" />
        {isRRPPBoss && (
          <>
            <div className="mb-4">
              <p className="text-muted-foreground">Mis RRPP</p>
              <div className="mt-2">
                <Input type="text" placeholder="Buscar rrpp..." />
              </div>
            </div>
            <ScrollArea className="h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    {Array.from({
                      length: Number(event?.expectedStoryCountPerUser),
                    }).map((_, index) => (
                      <TableHead key={index}>Historia {index + 1}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rrpp.map((user) => (
                    <TableRow key={user.user.id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback>
                              <AvatarImage
                                src={user.user.avatar}
                                alt={user.user.name}
                              />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">
                              {user.user.name} {user.user.lastName}
                            </p>
                            <p className="text-muted-foreground">
                              {user.user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      {user.storiesStatus.map((status: any, index: number) => (
                        <TableCell key={`${user.user.id}-${index}`}>
                          <div>
                            {status ? (
                              <span className="text-green-500 font-semibold">
                                Sí
                              </span>
                            ) : (
                              <span className="text-red-500 font-semibold">
                                No
                              </span>
                            )}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            <div className="flex justify-end gap-4 mt-4">
              {event && <AddHistoryToEvent idEvent={String(event.id)} />}
              <Button variant="secondary">Generar Lista</Button>
            </div>
          </>
        )}
        {isRRPP && (
          <>
            <div className="mb-4">
              <p className="text-black font-semibold">
                Mis Historias Pulicadas
              </p>
            </div>
            <ScrollArea className="overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Fecha Publicada</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instragramStories.map((ig, index) => (
                    <TableRow key={`${ig.id}-${index}`}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <p className="font-semibold">{ig.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <p className="font-semibold">
                            {formatDate(String(ig.date))}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            <div className="flex justify-end gap-4 mt-4">
              <AddHistoryToEventDialog idEvent={String(event?.id)} />
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default EventCardComponent;
function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
