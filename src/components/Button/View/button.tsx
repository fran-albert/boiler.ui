import Link from "next/link";
import ActionIcon from "@/components/Icons/action";
import { Button } from "@/components/ui/button";
import { FaRegEye } from "react-icons/fa";

export const ViewButton = ({
  slug,
  text,
  path,
  url,
}: {
  slug?: string;
  text: string;
  path?: string;
  url?: string;
}) => {
  const handleClick = () => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex justify-center">
      {url ? (
        <Button variant="ghost" size="icon" onClick={handleClick}>
          <ActionIcon
            tooltip={text}
            icon={<FaRegEye className="w-4 h-4 text-cyan-800" />}
          />
        </Button>
      ) : (
        <Link href={`/${path}/${slug}`}>
          <Button variant="ghost" size="icon">
            <ActionIcon
              tooltip={text}
              icon={<FaRegEye className="w-4 h-4 text-cyan-800" />}
            />
          </Button>
        </Link>
      )}
    </div>
  );
};
