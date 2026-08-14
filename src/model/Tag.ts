export type TagObject = {
    commit: {
        sha: string | null;
        url: string | null;
    }
    name: string | null;
    node_id: string | null;
    tarball_url: string | null;
    zipball_url: string | null;
}

export class Tag {
    name: string | null;
    nodeID: string | null;
    tarballURL: string | null;
    zipballURL: string | null;

    constructor(tag: TagObject) {
        this.name = tag?.name ? tag.name : null;
        this.nodeID = tag?.node_id ? tag.node_id : null;
        this.tarballURL = tag?.tarball_url ? tag.tarball_url : null;
        this.zipballURL = tag?.zipball_url ? tag.zipball_url : null;
    }
}