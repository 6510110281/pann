import { AnnouncementRepository } from "./AnnounceRepo";
import { UserResultRepository } from "./UserResultRepo";

const repositories = {
    announcements: new AnnouncementRepository(),
    userResult: new UserResultRepository()
}

export default repositories
