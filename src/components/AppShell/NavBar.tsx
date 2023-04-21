import { ChapterPicker } from "~/components/ChapterPicker";

export const NavBar = () => (
  <nav class={"mx-auto max-w-2xl px-6 lg:px-8"}>
    <div class="border-b border-black">
      <div class="flex h-16 justify-between items-center">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <p class="text-md font-black">The Good Book</p>
          </div>
        </div>
        <ChapterPicker value={"Geneza 1"} />
      </div>
    </div>
  </nav>
);
