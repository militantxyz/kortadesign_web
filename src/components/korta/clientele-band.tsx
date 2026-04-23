import { asset } from "@/lib/korta-data";

const clientele = [
  { name: "Belmond Cap Juluca", image: asset("2025/01/clientele/belmond-cap-juluca.png") },
  { name: "LIOQA Resort", image: asset("2025/01/clientele/lioqa-resort.png") },
  { name: "Baoli", image: asset("2025/01/clientele/baoli.png") },
  { name: "Sunset Hospitality Group", image: asset("2025/01/clientele/sunset-hospitality-group.png") },
  { name: "Spindler", image: asset("2025/01/clientele/spindler.png") },
  { name: "Diamond Villa Korcula", image: asset("2025/01/clientele/diamond-villa-korcula.png") },
  { name: "Joel", image: asset("2025/01/clientele/joel.png") },
  { name: "LaMaison", image: asset("2025/01/clientele/la-maison.png") },
];

export function ClienteleBand() {
  return (
    <section className="bg-[#e8ece6] px-[8%] py-[8%] text-center max-md:px-[4%]">
      <h2 className="mb-12 text-[clamp(1.45rem,3vw,2.35rem)] font-bold uppercase tracking-[0.18em] text-[#151411]">
        Clientele
      </h2>
      <div className="grid grid-cols-4 gap-px bg-[#cfd6ca] max-xl:grid-cols-2 max-md:grid-cols-1">
        {clientele.map((client) => (
          <div className="grid min-h-48 place-items-center bg-[#f8f5ef] p-8 transition hover:bg-white" key={client.name}>
            <img className="max-h-24 max-w-[82%] object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" src={client.image} alt={client.name} />
          </div>
        ))}
      </div>
    </section>
  );
}
