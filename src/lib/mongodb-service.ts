import { MongoClient, Db, Collection } from 'mongodb'

class MongoDBService {
  private client: MongoClient | null = null
  private db: Db | null = null

  private getClient(): MongoClient {
    if (!this.client) {
      // Skip database connection during build phase
      if (process.env.NEXT_PHASE === 'phase-production-build') {
        throw new Error('Database not available during build phase')
      }

      const connectionString = process.env.DATABASE_URL
      if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is not set')
      }
      this.client = new MongoClient(connectionString)
    }
    return this.client
  }

  async connect(): Promise<void> {
    if (!this.db) {
      const client = this.getClient()
      await client.connect()
      this.db = client.db('metoo_blog')
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
    }
    this.db = null
  }

  private async getCollection(name: string): Promise<Collection> {
    await this.connect()
    return this.db!.collection(name)
  }

  // Article operations using native MongoDB driver
  async createArticle(articleData: {
    title: string
    excerpt: string
    content: string
    readTime: string
    url?: string
    image?: string
    tags: string[]
    published?: boolean
    linkedinPostUrl?: string
  }) {
    const collection = await this.getCollection('articles')

    const article = {
      ...articleData,
      likes: 0,
      comments: 0,
      shares: 0,
      published: articleData.published ?? false,
      linkedinPostUrl: articleData.linkedinPostUrl || null,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await collection.insertOne(article)
    return { ...article, id: result.insertedId.toString() }
  }

  async updateArticle(id: string, updateData: any) {
    const collection = await this.getCollection('articles')
    const { ObjectId } = require('mongodb')

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date()
        }
      }
    )

    return result.modifiedCount > 0
  }

  async deleteArticle(id: string) {
    const collection = await this.getCollection('articles')
    const { ObjectId } = require('mongodb')

    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }

  // Admin operations
  async createAdmin(secretCode: string) {
    const collection = await this.getCollection('admins')

    const admin = {
      secretCode,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await collection.insertOne(admin)
    return { ...admin, id: result.insertedId.toString() }
  }

  async findAdminBySecretCode(secretCode: string) {
    const collection = await this.getCollection('admins')
    return await collection.findOne({ secretCode, isActive: true })
  }
}

export const mongoService = new MongoDBService()
