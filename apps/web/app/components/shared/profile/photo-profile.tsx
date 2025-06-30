import { Avatar, AvatarImage } from '~/components/ui/avatar';

export function PhotoProfile() {
  return (
    <Avatar className="w-40 h-40">
      <AvatarImage src="https://i.pinimg.com/videos/thumbnails/originals/54/b5/9b/54b59b26b09db545b2fceb2f8ebf5e00.0000000.jpg" />
    </Avatar>
  );
}
