import { JSX } from "solid-js";
import { NavBar } from "~/components/AppShell/NavBar";

export const AppShell = ({ children }: { children: JSX.Element }) => (
  <div class={"min-h-full"}>
    <NavBar />
    <main>
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
    </main>
  </div>
);
