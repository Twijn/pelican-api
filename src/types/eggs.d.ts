export interface EggScript {
    privileged: boolean;
    install: string;
    entry: string;
    container: string;
    extends: any;
}

export interface Egg {
    id: number;
    uuid: number;
    name: number;
    author: string;
    description: string;
    docker_image: string;
    docker_images: any;
    config: any;
    startup: string;
    script: EggScript;
    created_at: string;
    updated_at: string;
}
