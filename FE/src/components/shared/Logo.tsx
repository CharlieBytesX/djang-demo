import logoPath from "@/assets/carLogo.jpeg";

export default function Logo() {
  return (
    <div>
      <img alt="" className="w-full h-auto overflow-hidden" src={logoPath} />
    </div>
  );
}
