export const profileTitleClass = "font-heading text-lg font-semibold leading-6";
export const profileTextClass = "text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7";
export const profileLabelClass = "mb-1 text-sm font-semibold leading-6 text-zinc-900 sm:text-base";

export interface ProfileBlock {
  id: string;
  text: string;
  label?: string;
}

export interface ProfileSection {
  id: "profile" | "biography" | "roles";
  title: string;
  blocks: ProfileBlock[];
}

export interface ProfileFragment extends ProfileBlock {
  start: number;
  end: number;
}

export interface ProfilePage {
  section: ProfileSection["id"];
  title: string;
  fragments: ProfileFragment[];
}

// Measure real typography, including wrapping, before distributing text into pages.
export function paginateProfile(
  sections: ProfileSection[],
  measure: HTMLDivElement,
  width: number,
  height: number,
): ProfilePage[] {
  const pages: ProfilePage[] = [];
  const heading = document.createElement("h3");
  heading.className = profileTitleClass;
  const body = document.createElement("div");
  body.className = "mt-4 space-y-4";
  measure.replaceChildren(heading, body);

  function fits(fragments: ProfileFragment[]) {
    body.replaceChildren(...fragments.map((fragment) => {
      const block = document.createElement("div");
      if (fragment.label) {
        const label = document.createElement("h4");
        label.className = profileLabelClass;
        label.textContent = fragment.label;
        block.append(label);
      }
      const paragraph = document.createElement("p");
      paragraph.className = profileTextClass;
      paragraph.textContent = fragment.text;
      block.append(paragraph);
      return block;
    }));
    return measure.getBoundingClientRect().height <= height - 2;
  }

  for (const section of sections) {
    heading.textContent = section.title;
    measure.style.width = `${section.id === "profile" ? (width - 20) * 2 / 3 : width}px`;
    let fragments: ProfileFragment[] = [];
    const finishPage = () => {
      if (fragments.length) pages.push({ section: section.id, title: section.title, fragments });
      fragments = [];
    };

    for (const block of section.blocks) {
      const words = block.text.trim().split(/\s+/);
      let start = 0;
      while (start < words.length) {
        const fragment = (end: number): ProfileFragment => ({
          ...block,
          text: words.slice(start, end).join(" "),
          start,
          end,
        });
        if (fits([...fragments, fragment(words.length)])) {
          fragments.push(fragment(words.length));
          break;
        }

        let low = start;
        let high = words.length;
        while (low < high) {
          const middle = Math.ceil((low + high) / 2);
          if (fits([...fragments, fragment(middle)])) low = middle;
          else high = middle - 1;
        }
        if (low === start && fragments.length) {
          finishPage();
          continue;
        }
        const end = Math.max(start + 1, low);
        fragments.push(fragment(end));
        finishPage();
        start = end;
      }
    }
    finishPage();
  }
  measure.replaceChildren();
  return pages;
}

export function findProfilePage(pages: ProfilePage[], current?: ProfilePage) {
  const anchor = current?.fragments[0];
  if (!anchor) return 0;
  const index = pages.findIndex(page => page.fragments.some(fragment =>
    fragment.id === anchor.id && fragment.start <= anchor.start && fragment.end > anchor.start,
  ));
  return Math.max(0, index);
}
