import { PageHero } from "@/components/korta/page-hero";
import { asset } from "@/lib/korta-data";

export function EuPage() {
  return (
    <>
      <PageHero title="EU" eyebrow="Project" image={asset("2025/01/HR-Sufinancira-EUROPSKA-UNIJA_POS_POS-1024x271-1.png")} />
      <section className="mx-auto max-w-5xl px-[8%] py-[8%] max-md:px-[4%]">
        <h2 className="font-heading mb-8 text-[clamp(2.8rem,6vw,6.8rem)] font-normal leading-[0.88] tracking-normal text-[#151411]">KORTA GROUP d.o.o. započinje s provedbom projekta internacionalizacije poslovanja</h2>
        <p className="mb-4 text-lg leading-8 text-[#5b554f]">
          KORTA GROUP d.o.o. započeo je s provedbom projekta pod nazivom &quot;Internacionalizacija poslovanja poduzetnika KORTA GROUP d.o.o.&quot; (referentni broj projekta: PK.1.3.10.0219).
        </p>
        <p className="mb-8 text-lg leading-8 text-[#5b554f]">Projekt se provodi u sklopu Poziva &quot;Potpora MSP-ovima za internacionalizaciju&quot; iz Programa Konkurentnost i kohezija 2021.-2027.</p>
        <h2 className="font-heading mb-5 text-4xl font-normal tracking-normal text-[#151411]">Cilj projekta</h2>
        <p className="mb-8 text-lg leading-8 text-[#5b554f]">Glavni cilj projekta je jačanje održivog rasta i konkurentnosti poduzeća kroz internacionalizaciju poslovanja i širenje na nova tržišta.</p>
        <h2 className="font-heading mb-5 text-4xl font-normal tracking-normal text-[#151411]">Osnovni podaci o projektu</h2>
        <ul className="mb-8 grid gap-2 text-lg leading-8 text-[#5b554f]">
          <li>Korisnik: KORTA GROUP d.o.o., Brajkovići 29B, Pazin.</li>
          <li>Ukupna vrijednost projekta: 158.409,00 EUR.</li>
          <li>Ukupni prihvatljivi troškovi: 158.409,00 EUR.</li>
          <li>Iznos dodijeljenih bespovratnih sredstava: 118.806,75 EUR.</li>
          <li>Izvor sufinanciranja: Europski fond za regionalni razvoj (ERDF).</li>
          <li>Razdoblje provedbe: 15.12.2025.-15.12.2026.</li>
        </ul>
        <h2 className="font-heading mb-5 text-4xl font-normal tracking-normal text-[#151411]">Kontakt za više informacija</h2>
        <p className="text-lg leading-8 text-[#5b554f]">KORTA GROUP d.o.o. Brajkovići 29B, 52000 Pazin, Stefano Ladavac 0917200427.</p>
      </section>
    </>
  );
}
