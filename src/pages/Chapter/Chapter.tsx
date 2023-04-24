import { Capped } from '~/components/metaComponents/Capped'

const VerseNumber = ({ number }: { number: number }) => <sup class={'font-black text-gray-500'}>{number}</sup>

export const Chapter = () => {
    // @ts-ignore
    return (
        <div class={'flex flex-col gap-12 sm:gap-16 mt-12 sm:mt-16'}>
            <Capped component={'h1'} class="text-3xl font-black leading-tight">
                Geneza 1
            </Capped>
            <Capped component={'p'} class="text-base">
                <VerseNumber number={1} /> La început, Dumnezeu a făcut cerurile și pământul. <VerseNumber number={2} />{' '}
                Pământul era pustiu și gol; peste fața adâncului de ape era întuneric, și Duhul lui Dumnezeu Se mișca pe
                deasupra apelor. <VerseNumber number={3} /> Dumnezeu a zis: „Să fie lumină!” Și a fost lumină.{' '}
                <VerseNumber number={4} /> Dumnezeu a văzut că lumina era bună și Dumnezeu a despărțit lumina de
                întuneric. <VerseNumber number={5} /> Dumnezeu a numit lumina zi, iar întunericul l-a numit noapte.
                Astfel, a fost o seară și apoi a fost o dimineață: aceasta a fost ziua întâi. <VerseNumber number={6} />{' '}
                Dumnezeu a zis: „Să fie o întindere între ape și ea să despartă apele de ape.”{' '}
                <VerseNumber number={7} /> Și Dumnezeu a făcut întinderea, și ea a despărțit apele care sunt dedesubtul
                întinderii de apele care sunt deasupra întinderii. Și așa a fost.
                <VerseNumber number={8} /> Dumnezeu a numit întinderea cer. Astfel, a fost o seară și apoi a fost o
                dimineață: aceasta a fost ziua a doua. <VerseNumber number={9} /> Dumnezeu a zis: „Să se strângă la un
                loc apele care sunt dedesubtul cerului și să se arate uscatul!” Și așa a fost.{' '}
                <VerseNumber number={10} /> Dumnezeu a numit uscatul pământ, iar grămada de ape a numit-o mări. Dumnezeu
                a văzut că lucrul acesta era bun. <VerseNumber number={11} /> Apoi Dumnezeu a zis: „Să dea pământul
                verdeață, iarbă cu sămânță, pomi roditori, care să facă rod după soiul lor și care să aibă în ei sămânța
                lor pe pământ.” Și așa a fost. <VerseNumber number={12} /> Pământul a dat verdeață, iarbă cu sămânță
                după soiul ei și pomi care fac rod și care își au sămânța în ei, după soiul lor. Dumnezeu a văzut că
                lucrul acesta era bun. <VerseNumber number={13} /> Astfel, a fost o seară și apoi a fost o dimineață:
                aceasta a fost ziua a treia. <VerseNumber number={14} /> Dumnezeu a zis: „Să fie niște luminători în
                întinderea cerului, ca să despartă ziua de noapte; ei să fie niște semne care să arate vremurile, zilele
                și anii <VerseNumber number={15} /> și să slujească de luminători în întinderea cerului, ca să lumineze
                pământul.” Și așa a fost. <VerseNumber number={16} /> Dumnezeu a făcut cei doi mari luminători, și
                anume: luminătorul cel mai mare, ca să stăpânească ziua, și luminătorul cel mai mic, ca să stăpânească
                noaptea; a făcut și stelele. <VerseNumber number={17} /> Dumnezeu i-a așezat în întinderea cerului, ca
                să lumineze pământul, <VerseNumber number={18} /> să stăpânească ziua și noaptea și să despartă lumina
                de întuneric. Dumnezeu a văzut că lucrul acesta era bun. <VerseNumber number={19} /> Astfel, a fost o
                seară și apoi a fost o dimineață: aceasta a fost ziua a patra.
            </Capped>
        </div>
    )
}
