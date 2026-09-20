import { CharacterSelectorSol } from "@/components/lobby/character-selector-sol";
import { CharacterSelectorVron } from "@/components/lobby/character-selector-vron";
import { WaitingListItem } from "@/components/lobby/waiting-list-item";

import { IntroContainer } from "../components/intro-container";
import { Button } from "../components/ui/button";
import { CustomInput } from "../components/ui/custom-input";
import { TitleHeader } from "../components/ui/title-header";

export function LobbyRoom() {
  return (
    <IntroContainer>
      <TitleHeader title="Capybara Escape" />

      <>
        <div className="flex flex-row justify-between items-center w-3/4">
          <CharacterSelectorSol
            disabled
            selected
            onSelect={() => {}}
            optionalDescription="Elek - Twój bohater"
          />

          <div className="flex w-92 flex-col items-stretch gap-4 pt-8">
            <p className="text-md text-white">POCZEKALNIA</p>
            <p className="text-lg text-white text-center tomorrow-font mt-2 mb-8">
              Oczekiwanie na resztę graczy. Wyślij im kod pokoju, by mogli
              dołączyć do gry.
            </p>

            <WaitingListItem
              index={1}
              nickname="Elek"
              character="Sol"
              isClientCharacter={true}
            />

            <WaitingListItem
              index={2}
              isWaiting
              character="Vron"
              isClientCharacter={false}
            />

            <div className="flex flex-col items-center gap-2 mt-8">
              <p className="text-lg text-white tomorrow-font">KOD POKOJU:</p>

              <CustomInput
                value="DFG32CDS"
                placeholder="Twój kod pokoju"
                className="w-64 mt-2"
                setValue={() => {}}
                disabled={true}
              />

              <Button
                onClick={() => {}}
                disabled={true}
                className="w-64 tomorrow-font font-bold py-2 my-4"
              >
                Graj
              </Button>
            </div>
          </div>

          <CharacterSelectorVron
            disabled
            selected={false}
            onSelect={() => {}}
          />
        </div>
      </>
    </IntroContainer>
  );
}
