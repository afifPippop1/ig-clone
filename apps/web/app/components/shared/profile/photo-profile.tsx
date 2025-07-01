import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

interface PhotoProfileProps {
  src?: string;
  fallback: string;
}

export function PhotoProfile(props: PhotoProfileProps) {
  return (
    <Avatar className="w-40 h-40">
      <AvatarImage src={props.src} />
      <AvatarFallback className="text-3xl">{props.fallback}</AvatarFallback>
    </Avatar>
  );
}
