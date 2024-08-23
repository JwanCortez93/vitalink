import { getRecentAppointments } from "@/lib/actions/appointment.actions";
import { CalendarClock, CalendarDays, CalendarX2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StatCard from "./(components)/StatCard";

import { columns } from "./(components)/table/columns";
import { DataTable } from "./(components)/table/DataTable";
import { Button } from "@/components/ui/button";
import NavBar from "./(components)/NavBar";

const AdminPage = async () => {
  const appointments = await getRecentAppointments();

  return (
    <div className="bg-neutral-800 mx-auto flex max-w-7xl flex-col space-y-14 text-white">
      <NavBar />

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-neutral-500">
            Start the day with managing new appointments
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={<CalendarDays className="text-green-500" />}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={<CalendarClock className="text-yellow-500" />}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={<CalendarX2 className="text-destructive" />}
          />
        </section>
        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
